const {message, danger, warn, fail} = require("danger");
const { basename } = require('path');

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

  if (additions > 250 && additions < 300) {
    warn(`Te estás acercandp al límite de 300 **additions**! Actualmente estás en ${additions}`);
  }

  if (additions > 300) {
    fail(`Superaste el límite de 300 **additions**. Actualmente estás en ${additions}`);
  }

  if (deletions > 250 && deletions < 300) {
    warn(`Te estás acercandp al límite de 300 **deletions**! Actualmente estás en ${deletions}`);
  }

  if (deletions > 300) {
    fail(`Superaste el límite de 300 **deletions**. Actualmente estás en ${deletions}`);
  }
};

if (!danger.github.pr.assignees.length) {
  warn("No te olvides de asignar a alquien a este PR!");
}

if(danger.github.requested_reviewers.length < 1) {
  warn("No te olvides de seleccionar al menos 1 reviewer a este PR!");
}

if (danger.github.pr.body.length < 10) {
  fail("Por favor, agregar una descripción al PR.");
}

totalModifications();