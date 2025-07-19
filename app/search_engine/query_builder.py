from typing import Optional, List, Tuple

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
      a.description              AS description,
      a.price,
      p.pID                      AS propertyID,
      p.name                     AS propertyName,
      p.street,
      p.town,
      p.county,
      GROUP_CONCAT(k.kID)        AS matched_kIDs,
      GROUP_CONCAT(k.name)       AS matched_keywords
    FROM PropertyKeywordAdvert pka
      JOIN Property p   ON p.pID   = pka.pID
      JOIN Adverts a    ON a.adID  = pka.adID
      JOIN Keywords k   ON k.kID   = pka.kID
    """

    where_clauses: List[str] = []
    params: List = []

    # Keywords OR-block
    if keywords:
        or_parts = [f"k.{kw} = 1" for kw in keywords]
        where_clauses.append("(" + " OR ".join(or_parts) + ")")

    # Location
    where_clauses.append("p.town = %s")
    params.append(location)

    # Price, Bedrooms, Bathrooms
    if price is not None:
        where_clauses.append("a.price <= %s")
        params.append(price)

    if bedrooms is not None:
        where_clauses.append("p.bedrooms >= %s")
        params.append(bedrooms)

    if bathrooms is not None:
        where_clauses.append("p.bathrooms >= %s")
        params.append(bathrooms)

    # Stitch WHERE together
    sql += "\nWHERE " + "\n  AND ".join(where_clauses)

    # GROUP BY on everything
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

    return sql, params
