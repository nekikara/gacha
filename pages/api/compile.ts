// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Element } from '~/interfaces/element'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  html: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const elements = req.body.elements
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

    const contents = elements.map((elem: Element) => {
      const styles = `
        position: absolute;
        top: ${elem.position.top}px;
        left: ${elem.position.left}px;
        width: ${elem.width}px;
        height: ${elem.height}px
      `;
      return `<button type="button" style="${styles}">button</button>`
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