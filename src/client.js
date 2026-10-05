const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.main-nav')

if (menuToggle && nav) {
  const openLabel = document.documentElement.lang === 'en' ? 'Open menu' : 'فتح القائمة'
  const closeLabel = document.documentElement.lang === 'en' ? 'Close menu' : 'إغلاق القائمة'
  const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
  const menuIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open')
    menuToggle.setAttribute('aria-expanded', String(open))
    menuToggle.setAttribute('aria-label', open ? closeLabel : openLabel)
    menuToggle.innerHTML = open ? closeIcon : menuIcon
  })

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open')
      menuToggle.setAttribute('aria-expanded', 'false')
      menuToggle.setAttribute('aria-label', openLabel)
      menuToggle.innerHTML = menuIcon
    })
  })
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
}
