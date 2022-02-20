export const templates = {
  createProject: '<form>' +
    '<input type="text" label="Name" placeholder="Enter Project name" class="swal2-input entered-project-name"/>' +
    '<input type="text" label="Description" placeholder="Enter Project Description" class="swal2-input entered-project-description"/>' +
    '<br><br>' +
    '<label for="google-support" class="popup-label">Google Drive support</label>' +
    '<input type="checkbox" label="Google drive support" id="google-support"/>' +
    '<br>' +
    '<label for="discord-webhook-support" class="popup-label">Discord Webhook support</label>' +
    '<input type="checkbox" label="Discord Webhook support" id="discord-webhook-support"/>' + '</form>',
  dark: `<span class="material-icons-outlined material-icons">
    dark_mode
    </span>`,
  light: `<span class="material-icons-outlined material-icons">
    light_mode
    </span>`
}

export const sidebarInsert = (data) => {
  const displayElem = `<div class="project-dashboard hidden" data-project-for="${
    data.projectName
  }"><div class="project__details"><h2>${data.projectName}</h2><p class="description">${
    data.projectDescription
  }</p></div><div class="project__functions"><button class="project__editBtn" title="Edit project details" data-projectEdit-btn> <span class="material-icons-outlined material-icons">edit</span></button><button class="project__deleteBtn" title="Delete project" data-projectDelete-btn><span class="material-icons-outlined material-icons">delete</span></button></div><div class="project__main">${
    data['Google Support']
      ? `<label for="google-link">Spreadsheet link</label><input type="url" class="google-link" id="google-link" value="${'And example of link'}"disabled><button class="copy-btn" data-copy-btn>Copy link</button>`
      : ''
  }${
    data['Discord Webhook Support']
      ? `<label for="discord-webhook-link">Webhook link</label><input type="password" class="discord-webhook-link" id="discord-webhook-link" value="${data.discordWebhook}" disabled><button class="inp-mode-btn" data-inp-mode-btn>Show link</button>`
      : ''
  }</div></div>`
  return displayElem
}
