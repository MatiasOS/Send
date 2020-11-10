const {message, danger, warn} = require("danger");

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

if (!danger.github.pr.assignees.length) {
  warn("No te olvides de asignar a alquien a este PR!");
}

if(danger.github.requested_reviewers.length < 1) {
  warn("No te olvides de seleccionar al menos 1 reviewer a este PR!");
}