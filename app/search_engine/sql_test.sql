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

  GROUP_CONCAT(DISTINCT k.name 
               ORDER BY k.name 
               SEPARATOR ',')
    AS matched_keywords

FROM PropertyKeywordAdvert pka
JOIN Property p   ON p.pID   = pka.pID
JOIN Adverts a    ON a.adID  = pka.adID
JOIN Keywords k   ON k.kID   = pka.kID

WHERE
  p.town      = 'Canterbury'
  AND (k.house  = 1 OR k.flat = 1)
  AND a.price  <= 1200
  AND p.bedrooms >= 2

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