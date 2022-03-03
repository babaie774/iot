import icons from 'utils/icons'

export const popUpLinks = (id: string | null, panel: boolean): any[] => [
  {
    title: !panel ? 'پنل مدیریت کانال' : 'بازگشت به گیمریا',
    link: !panel ? `/user/${id || 123}/dashboard` : '/',
    icon: icons.panel(),
  },
  {
    title: 'سوالات متداول',
    link: '/faq',
    icon: icons.rules(),
  },
  {
    title: 'شرایط و قوانین',
    link: '/terms',
    icon: icons.faq(),
  },
  {
    title: 'درباره گیمریا',
    link: '/about-us',
    icon: icons.aboutUs(),
  },
]

export const handleLogout = (router: any) => {
  localStorage.clear()
  if (router.pathname.slice(0, 5) === '/user') {
    router.push('/')
  } else {
    router.reload()
  }
}
