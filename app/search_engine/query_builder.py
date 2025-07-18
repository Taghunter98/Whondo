
from typing import Optional

def build_query(
    keywords: list[str],
    location: str,
    price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    bathrooms: Optional[int] = None,
) -> tuple[str, list]:
    """
    The function returns a SQL tempalte and parameters ready for execution.

    Args:
        keywords (list[str]): List of keywords
        location (str): Location name
        price (float | None, optional): Property price. Defaults to None.
        bedrooms (int | None, optional): Bedrooms. Defaults to None.
        bathrooms (int | None, optional): Bathrooms. Defaults to None.

    Returns:
        tuple[str, list]: SQL and parameters
    """

    sql = """
    SELECT
      pka.pkaID,
      pka.pID,
      pka.kID,
      pka.adID,
      a.title,
      a.price,
      p.name   AS propertyName,
      p.street,
      p.town,
      p.county
    FROM PropertyKeywordAdvert pka
    JOIN Property p   ON p.pID   = pka.pID
    JOIN Adverts a    ON a.adID  = pka.adID
    JOIN Keywords k   ON k.kID   = pka.kID
    """

    where_clauses = []
    params = []

    if keywords:
        or_parts = []
        for kw in keywords:
            or_parts.append(f"k.{kw} = 1")
        where_clauses.append("(" + " OR ".join(or_parts) + ")")

    # Location filter
    where_clauses.append("p.town = %s")
    params.append(location)

    # Price filter
    if price is not None:
        where_clauses.append("a.price <= %s")
        params.append(price)

    # Bedrooms filter
    if bedrooms is not None:
        where_clauses.append("p.bedrooms >= %s")
        params.append(bedrooms)

    # Bathrooms filter
    if bathrooms is not None:
        where_clauses.append("p.bathrooms >= %s")
        params.append(bathrooms)

    # Stitch WHERE clauses together
    sql += "\nWHERE  " + "\n  AND ".join(where_clauses) + ";"

    return sql, params
