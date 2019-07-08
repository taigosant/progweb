/**
 * CursoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    index: async function (req, res) {
        const cursos = await Curso.find();
        console.log("[cursos]", cursos);
        res.view('pages/cursos/index', { cursos: cursos });
    },
    create: async function (req, res) { },
    read: async function (req, res) { },
    update: async function (req, res) { },
    delete: async function (req, res) { },
};

