/**
 * Module dependencies
 */

// ...


/**
 * account/selecionar-curso.js
 *
 * Selecionar curso.
 */
module.exports = async function selecionarCurso(req, res) {
  console.log("[METHOD]", req.method);
  if (req.method == "GET") {
    const cursos = await Curso.find();
    return res.view('pages/account/selecionar-curso', { cursos: cursos });
  } else {
    const userId = req.me.id;
    const [user] = await User.update({ id: userId }).set({ curso: parseInt(req.body.curso) }).fetch();
    console.log("[USER]", user);
    req.me.curso = user.curso;
    [curso] = await Curso.find({ id: user.curso }).limit(1);
    console.log("[curso]", curso);
    res.status(200).send({ message: "Alterado!" });
  }
};
