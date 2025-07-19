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
  a.image1,
  a.image2,
  a.image3,
  a.image4,
  a.image5,
  a.image6,
  a.image7,
  a.image8,
  a.image9,
  a.image10,
  k.*

FROM PropertyKeywordAdvert pka
JOIN Property p   ON p.pID   = pka.pID
JOIN Adverts a    ON a.adID  = pka.adID
JOIN Keywords k   ON k.kID   = pka.kID

WHERE
  p.town      = 'Canterbury'
  AND (k.house  = 1 OR k.flat = 1)
  AND a.price  <= 2000
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
  p.county,
  a.image1,
  a.image2,
  a.image3,
  a.image4,
  a.image5,
  a.image6,
  a.image7,
  a.image8,
  a.image9,
  a.image10;