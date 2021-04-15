const  express = require ('express');

const server = express();

server.use(express.json());

let projects = [];


let requests = 0;

//Middlewares
/**
 * Middleware to check if username exists in database
 * @param {*} next Goes to next function
 */
function CheckIfExists (req, res, next) {
    const id = req.params.id;
    const index = projects.findIndex(x=> x.id === id);
    if(index === -1) {
        return res.status(400).json({error: "Projeto não existe"});
    }
    
    return next();

}
/**
 * Function to count how much requests were made in the application
 */
function CountReq (req, res, next) {
    requests++;
   console.log(`Foram realizadas ${requests} requisições`);

    return next();
}

/**
 * Retorna todos os projetos
 */
server.get('/projects', CountReq, (req, res) => {

    return res.json(projects);
 });
/**
 * Cadastra um novo projeto
 * request body: id, title
 */
server.post('/projects', CountReq,  (req,res) => {
    const {id, title} = req.body;
    const project = {
        id,
        title,
        tasks: []
        };
    projects.push(project);

    return res.json({message: "Projeto criado!"});
});

/**
 * route params: id
 * Modifica o título de um projeto
 */
server.put('/projects/:id', CheckIfExists, CountReq, (req,res) => {
    const {id, title} = req.body;

   const index = projects.findIndex(x => x.id === id) 
   projects[index].title = title;

   return res.json({message: "Título modificado"});
})

/**
 * route params: id
 * Insere uma Task no projeto
 */
server.post('/projects/:id/tasks', CheckIfExists, CountReq, (req,res) => {
    const {title} = req.body;
    const {id} = req.params;

    const index = projects.findIndex(x => x.id === id);
    projects[index].tasks.push(title);

    return res.json({message: "Task adicionada"});

});
/**
 * route params: id
 * Deleta um projeto
 */
server.delete('/projects/:id', CheckIfExists, CountReq, (req,res) => {
    const {id} = req.params;
    const index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);

    return res.send(projects);
})

/**
 * Faz o servidor apontar para a porta 3000
 */
server.listen(3000, (req,res) => {
    return console.log("Listening on port 3000");
});