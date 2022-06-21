
import {NextApiRequest, NextApiResponse} from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        {id: 0, name: 'Tiago Rocha'},
        {id: 0, name: 'Marízia Rabelo'},
        {id: 0, name: 'Ana Lourdes'},
        {id: 0, name: 'Jairo Alves'},
        {id: 0, name: 'Natália Araújo'},
    ]

    return res.json(users);
}