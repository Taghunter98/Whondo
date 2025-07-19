from typing import Optional, List, Tuple
from flask import current_app

def build_query(
    keywords: List[str],
    location: str,
    price: Optional[float]  = None,
    bedrooms: Optional[int] = None,
    bathrooms: Optional[int] = None,
) -> Tuple[str, List]:
    sql = """
    SELECT
      a.adID,
      a.title,
      a.description,
      a.price,
      p.pID            AS propertyID,
      p.name           AS propertyName,
      p.street,
      p.town,
      p.county,
      GROUP_CONCAT(DISTINCT k.name ORDER BY k.name SEPARATOR ',')
          AS matched_keywords
    FROM PropertyKeywordAdvert pka
      JOIN Property p   ON p.pID   = pka.pID
      JOIN Adverts a    ON a.adID  = pka.adID
      JOIN Keywords k   ON k.kID   = pka.kID
    """

    where_clauses: List[str] = []
    params:        List     = []

    # 1) Keyword flags
    if keywords:
        or_parts = [f"k.{kw} = 1" for kw in keywords]
        where_clauses.append("(" + " OR ".join(or_parts) + ")")

    # 2) Town
    where_clauses.append("p.town = %s")
    params.append(location)

    # 3) Price / beds / baths
    if price is not None:
        where_clauses.append("a.price <= %s")
        params.append(price)
    if bedrooms is not None:
        where_clauses.append("p.bedrooms >= %s")
        params.append(bedrooms)
    if bathrooms is not None:
        where_clauses.append("p.bathrooms >= %s")
        params.append(bathrooms)

    # 4) Stitch WHERE…GROUP BY
    sql += "\nWHERE " + "\n  AND ".join(where_clauses)
    sql += """
    GROUP BY
      a.adID,
      a.title,
      a.description,
      a.price,
      p.pID,
      p.name,
      p.street,
      p.town,
      p.county;
    """

    # Log the final SQL & params for troubleshooting
    current_app.logger.debug("Search SQL:\n%s\nParams: %s", sql, params)
    return sql, params
