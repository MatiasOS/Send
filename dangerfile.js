const {message, danger, warn, fail} = require("danger");
const { basename } = require('path');


const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

if (!danger.github.pr.assignees.length) {
  warn("No te olvides de asignar a alquien a este PR!");
}

if(danger.github.requested_reviewers.length < 1) {
  warn("No te olvides de seleccionar al menos 1 reviewer a este PR!");
}

if (danger.github.pr.body.length < 10) {
  fail("Agregar una descripción al PR!");
}

const totalModifications = async () => {
  const { data: fileList } = await danger.github.api.pulls.listFiles({
    owner: danger.github.thisPR.owner,
    repo: danger.github.thisPR.repo,
    pull_number: danger.github.thisPR.number,
  });

  const modifiedFiles = fileList
    .filter((f) => {
      const filename = basename(f.filename)
      return filename !== 'package-lock.json' && filename !== 'yarn.lock'
    });

  const additions = modifiedFiles.reduce((acc, file) => acc + file.additions, 0);
  const deletions = modifiedFiles.reduce((acc, file) => acc + file.deletions, 0);

  if(additions < 200 && deletions < 200) {
    message(`Este PR tiene un tamño ideal! Solo ${additions + deletions} modificaciones!`);
  }

  if (additions > 200 && additions < 300) {
    warn(`Límite de **additions** es 300. Actualmente estás en ${additions}`);
  }

  if (additions > 300) {
    fail(`Límite de **additions** es 300. Actualmente estás en ${additions}`);
  }

  if (deletions > 200 && deletions < 300) {
    warn(`Límite de **deletions** es 300. Actualmente estás en ${deletions}`);
  }

  if (deletions > 300) {
    fail(`Límite de **deletions** es 300. Actualmente estás en ${deletions}`);
  }
};

totalModifications();