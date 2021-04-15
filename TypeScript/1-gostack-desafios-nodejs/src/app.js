const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const project = {
    id: uuid(),
    title: title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({error: 'Returning invalid Uuid'});
  }

  const projectIndex = repositories.findIndex(repository => repository.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'});
  }

  const project = repositories[projectIndex];

  const newProject = {
    id,
    title: title ? title : project.title,
    url: url ? url : project.url,
    techs: techs ? techs : project.techs,
    likes: project.likes,
  }

  return response.json(newProject);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(repository => repository.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'});
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(repository => repository.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'});
  }
  const project = repositories[projectIndex]

  const newProject = {
    id: project.id,
    title: project.title,
    techs: project.techs,
    likes: project.likes + 1,
  }

  repositories[projectIndex] = newProject;

  return response.json(newProject);

});

module.exports = app;
