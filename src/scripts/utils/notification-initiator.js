const notifications = document.querySelector('.notifications')

const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check'
  },
  error: {
    icon: 'fa-circle-xmark'
  },
  warning: {
    icon: 'fa-triangle-exclamation'
  },
  info: {
    icon: 'fa-circle-info'
  }
}

const removeToast = (toast) => {
  toast.classList.add('hide')
  if (toast.timeoutId) clearTimeout(toast.timeoutId)
  setTimeout(() => toast.remove(), 500)
}

const createToast = (id, text) => {
  const { icon } = toastDetails[id]
  const toast = document.createElement('li')
  toast.className = `toast ${id}`

  toast.innerHTML = `<div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <span>${text}</span>
                    </div>
                    <i class="fa-solid fa-xmark"></i>`
  notifications.appendChild(toast)

  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}

export { createToast, removeToast }
