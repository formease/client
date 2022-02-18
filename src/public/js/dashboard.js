import Swal from 'sweetalert2'

// Theme functionality
const THEME_BTN = document.getElementById('theme-toggler')
let currentTheme = document.documentElement.dataset.theme
let localTheme = localStorage.getItem('theme')
const preferedTheme = window.matchMedia('(prefers-color-scheme: dark)')

const darkPopupStyleSheet = document.getElementById('popup-dark-theme')

const themesBtnHTML = {
  dark: `<span class="material-icons-outlined material-icons">
    dark_mode
    </span>`,
  light: `<span class="material-icons-outlined material-icons">
    light_mode
    </span>`
}

const themeChecker = () => {
  if (localTheme) {
    localTheme = localStorage.getItem('theme')

    document.documentElement.dataset.theme = localTheme
    THEME_BTN.innerHTML = themesBtnHTML[localTheme]

    if (localTheme === 'light') darkPopupStyleSheet.remove()
    else if (localTheme === 'dark') document.head.append(darkPopupStyleSheet)
  } else if (preferedTheme.matches) {
    document.documentElement.dataset.theme = 'dark'

    THEME_BTN.innerHTML = themesBtnHTML.dark
    document.head.append(darkPopupStyleSheet)

    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
    darkPopupStyleSheet.remove()
  }
}
themeChecker()

window.addEventListener('storage', (e) => {
  const storageArea = e.storageArea
  const keyChanged = e.key

  if (keyChanged !== 'theme') return
  localStorage.setItem(keyChanged, storageArea.theme)
  themeChecker()
})

THEME_BTN.addEventListener('click', () => {
  currentTheme = document.documentElement.dataset.theme
  if (currentTheme === 'dark') {
    document.documentElement.dataset.theme = 'light'
    THEME_BTN.innerHTML = themesBtnHTML.light
    darkPopupStyleSheet.remove()

    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.dataset.theme = 'dark'
    THEME_BTN.innerHTML = themesBtnHTML.dark
    localStorage.setItem('theme', 'dark')

    document.head.append(darkPopupStyleSheet)
  }
})
// profile tooltip toggler
const profileWrapper = document.querySelector('.profile-wrapper')
profileWrapper.addEventListener('click', function () {
  profileWrapper.querySelector('.profile__tooltip').classList.toggle('profile__tooltip--active')
})

// sidebar toggler
const asideElem = document.querySelector('aside')
document.querySelector('[data-sidebar-toggler]').addEventListener('click', () => {
  asideElem.classList.toggle('active')

  document.addEventListener('click', (e) => {
    const target = e.target
    if (target.closest('aside') || target.closest('[data-sidebar-toggler]')) return
    if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
  })
})
// -----------------------
const createProjectBtn = document.querySelector('[data-create-project-btn]');
const projectList = document.getElementById('project-list');
const mainWrapper = document.querySelector('.main__wrapper');
let projects = [];

const createProjectPopupObj = {
  title: 'Create Project',
  html:
    '<input type="text" label="Name" placeholder="Enter Project name" class="swal2-input entered-project-name"/>' +
    '<input type="text" label="Description" placeholder="Enter Project Description" class="swal2-input entered-project-description"/>' +
    '<br><br>' +
    '<label for="google-support" class="popup-label">Google Drive support</label>' +
    '<input type="checkbox" label="Google drive support" id="google-support"/>' +
    '<br>' +
    '<label for="discord-webhook-support" class="popup-label">Discord Webhook support</label>' +
    '<input type="checkbox" label="Discord Webhook support" id="discord-webhook-support"/>',
  showCancelButton: true,
  confirmButtonText: 'Create Project',
  preConfirm: () => {
    return {
      projectName: document.querySelector('.entered-project-name').value,
      projectDescription: document.querySelector('.entered-project-description').value,
      'Google Support': document.getElementById('google-support').checked,
      'Discord Webhook Support': document.getElementById('discord-webhook-support').checked
    }
  }
}

createProjectBtn.addEventListener('click', async function (e) {
  if (e.defaultPrevented) return

  const { value: data } = await Swal.fire(createProjectPopupObj)
  if (!data) return

  if (data.projectName.length < 4 || data.projectName.length > 40) {
    const { value: projectName } = await Swal.fire({
      title: 'Project name should have at least 4 characters and at maximum 40',
      input: 'text',
      icon: 'error',
      inputLabel: 'Enter Project name',
      inputValue: data.projectName,
      inputPlaceholder: 'Project name..',
      showCancelButton: true,
      inputAttributes: {
        autocomplete: 'off'
      },
      inputValidator: (value) => {
        if (value.length < 4) {
          return 'Name should have at least 4 characters and at maximum 30!'
        } else if (value.length > 40) {
          return 'Name should have at maximum 40 characters!'
        }
      }
    })
    data.projectName = projectName;
  }
  if (!data.projectName) return;

  if (projects.find((project) => project.projectName == data.projectName)) {
    Swal.fire({
      icon: 'error',
      title: 'Already a project with same name',
      text: 'Please choose a different name for your project',
      inputAttributes: {
        autocomplete: 'off'
      },
    })
    return;
  }

  if (data['Discord Webhook Support']) {
    const {value: webhook} = await Swal.fire({
      icon: 'info',
      title: 'One more step! Enter your discord webhook here!',
      footer: "Don't really know how? Follow the steps-<a href='https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks'> here</a>",
      input: 'url',
      inputLabel: 'Discord Webhook url',
      inputPlaceholder: 'Enter the URL',
      showCancelButton: true
    })
    if (!webhook) return;
    data.discordWebhook = webhook;
  }
  if (data && data.projectName.length >= 4 && data.projectName.length <= 40) {
    Swal.fire({
      toast: true,
      icon: 'success',
      title: 'Project created successfully!',
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true
    })
    projects.push(data);
    let projectObj = projects[projects.length - 1]

    const projectElemHTML = `<li data-project="${data.projectName}">${data.projectName}<small>${data.projectDescription}</small></li>`
    projectList.insertAdjacentHTML('beforeend', projectElemHTML)

    const projectDashboardHTML = `<div class="project-dashboard hidden" data-project-for="${data.projectName}"><div class="project__details"><h2>${data.projectName}</h2><p class="description">${data.projectDescription}</p></div><div class="project__functions"><button class="project__editBtn" title="edit project details" data-projectEdit-btn> <span class="material-icons-outlined material-icons">edit</span></button><button class="project__deleteBtn" title="Delete project" data-projectDelete-btn><span class="material-icons-outlined material-icons">delete</span></button></div><div class="project__main">${data['Google Support'] ? `<label for="google-link">Spreadsheet link</label><input type="text" class="google-link" id="google-link" value="${'And example of link'}"disabled><button class="copy-btn" data-copy-btn>Copy link</button>`: ""}</div></div>`
    mainWrapper.insertAdjacentHTML('beforeend', projectDashboardHTML)

    removeOtherDashboard(data.projectName)

    projectObj.asideProjectElem = projectList.lastElementChild
    projectObj.mainProjectElem = mainWrapper.lastElementChild

    // extra stuff
    const currentProjectDashboard = mainWrapper.lastElementChild;
    const copyBtn = currentProjectDashboard.querySelector('[data-copy-btn]');
    const editBtn = currentProjectDashboard.querySelector('[data-projectEdit-btn]');
    const deleteBtn = currentProjectDashboard.querySelector('[data-projectDelete-btn]')

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.previousElementSibling.value);
        let copyBtnText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!'
        setTimeout(() => {
          copyBtn.textContent = copyBtnText
        }, 1500)
      })
    }

    editBtn.addEventListener('click', async () => {
      const {value: result} = await Swal.fire({
        title: 'Edit Project Details',
        html:
          `<input type="text" label="Name" placeholder="Enter Project name" value="${data.projectName}" class="swal2-input entered-project-name"/>` +
          `<input type="text" label="Description" placeholder="Enter Project Description" value="${data.projectDescription}" class="swal2-input entered-project-description"/>`,
        showCancelButton: true,
        footer: 'Only these details can be edited at the moment...',
        confirmButtonText: 'Edit Details',
        preConfirm: () => {
        return {
          projectName: document.querySelector('.entered-project-name').value,
          projectDescription: document.querySelector('.entered-project-description').value,
          }
        }
      });
      if (!result) return;
      projectObj.projectDescription = result.projectDescription
      projectObj.projectName = result.projectName

      projectObj.asideProjectElem.innerHTML = `${result.projectName}<small>${result.projectDescription}</small>`
      projectObj.mainProjectElem.querySelector('h2').textContent = result.projectName;
      projectObj.mainProjectElem.querySelector('.description').textContent = result.projectDescription;
    })

    
      deleteBtn.addEventListener('click',  () => {
        Swal.fire({
          title: 'Delete Project?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete Project',
          html: '<b>Warning</b>- This action is permanent and can\'t be undone.',
          allowEnterKey: false
        }).then((result) => {
          if (!result.isConfirmed) return;
          projectObj.mainProjectElem.previousElementSibling?.classList.remove('hidden') || projectObj.mainProjectElem.nextElementSibling?.classList.remove('hidden')
          projectObj.asideProjectElem.remove();
          projectObj.mainProjectElem.remove();
          
          projects = projects.filter(project => project != projectObj);
        }) 
      })

  }
})

// dashboard project change
projectList.addEventListener('click', function (e) {
  const target = e.target.closest('li')
  if (!target) return

  const projectName = target.dataset.project
  removeOtherDashboard(projectName)
})

function removeOtherDashboard (currentDashboard) {
  const otherProjectDashboard = document.querySelectorAll(
    `.main__wrapper > .project-dashboard:not([data-project-for="${currentDashboard}"])`
  )

  otherProjectDashboard.forEach((projectDash) => {
    projectDash.classList.add('removing')
    setTimeout(() => {
      projectDash.classList.add('hidden')
      projectDash.classList.remove('removing')
    }, 300)
  })
  setTimeout(() => {
    document.querySelector(`[data-project-for="${currentDashboard}"]`).classList?.remove('hidden')
  }, 310)

  if (asideElem.classList.contains('active')) asideElem.classList.remove('active')
}
