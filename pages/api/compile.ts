import { ElementCollection } from '~/interfaces/elementCollection';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UUIDv4 } from '~/interfaces/element'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  html: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const elementCollection: ElementCollection = req.body.elementCollection
    const htmlFirst = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
`;

    const contents = elementCollection.order.map((elementId: UUIDv4) => {
      const elem = elementCollection.kv[elementId]
      const styles = `
        position: absolute;
        top: ${elem.position.top}px;
        left: ${elem.position.left}px;
        width: ${elem.width}px;
        height: ${elem.height}px
      `;
      if (elem.elementType.type === 'div') {
        return `<div style="${styles}"></div>`
      } else if (elem.elementType.type === 'none') {
        return ''
      } else {
        const buttonType = elem.elementType
        return `<button type="${buttonType.type}" style="${styles}">${buttonType.content}</button>`
      }
    });

    const htmlLast = `
</body>
</html>
`;
    const html = htmlFirst + contents.join('\n') + htmlLast;

    res.status(200).json({ html })
  } else {
    res.status(400)
  }
}