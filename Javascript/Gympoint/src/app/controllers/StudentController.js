import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    /**
     * Verifica de os dados estão na forma correta
     */
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Falha na validação da requisição' });
    }

    /**
     * Verifica se o aluno já existe no banco de dados
     */
    const StudentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (StudentExists) {
      return res.status(400).json({ error: 'Aluno já matriculado' });
    }

    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, idade, peso, altura });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      newEmail: Yup.string().email(),
      confirmEmail: Yup.string()
        .email()
        .when('newEmail', (newEmail, field) =>
          newEmail ? field.required().oneOf([Yup.ref('newEmail')]) : field
        ),
      idade: Yup.number(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const StudentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!StudentExists) {
      return res.status(400).json({ error: 'Estudante não cadastrado!' });
    }

    const student = await Student.findOne({ where: { email: req.body.email } });

    const { id, name, email, idade, peso, altura } = await student.update(
      req.body
    );

    return res.json({ id, name, email, idade, altura, peso });
  }
}

export default new StudentController();
