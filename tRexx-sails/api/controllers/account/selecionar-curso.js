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
  if (req.method == "GET") {
    const cursos = await Curso.find();
    res.view('pages/account/selecionar-curso', { cursos: cursos });
  } else {
    console.log("[BODY]", req.body);
    res.view('pages/account/account-overview');
  }
};
