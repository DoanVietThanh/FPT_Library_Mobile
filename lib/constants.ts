import { ENotificationType } from '~/types/enum'

export const NAV_THEME = {
  light: {
    background: 'hsl(21 0% 95%)', // background
    border: 'hsl(21 20% 82%)', // border
    card: 'hsl(21 0% 93%)', // card
    notification: 'hsl(0 50% 50%)', // destructive
    primary: 'hsl(178 71% 27%)', // primary
    text: 'hsl(21 0% 15%)', // foreground
  },
  dark: {
    background: 'hsl(21 10% 10%)', // background
    border: 'hsl(21 20% 18%)', // border
    card: 'hsl(21 0% 10%)', // card
    notification: 'hsl(4 86% 58%)', // destructive
    primary: 'hsl(178 71% 27%)', // primary
    text: 'hsl(21 0% 90%)', // foreground
  },
}

export const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '1076769092661-kde2gscmapurmteslfbhommlcobb685k.apps.googleusercontent.com',
  redirectUrl: `com.googleusercontent.apps.1076769092661-kde2gscmapurmteslfbhommlcobb685k:/oauth2redirect/google`, // Match with Google Console
  scopes: ['openid', 'profile', 'email'], // Scopes you want to request
}

export const getTypeColor = (type: ENotificationType): string => {
  switch (type) {
    case ENotificationType.EVENT:
      return 'bg-success'
    case ENotificationType.NOTICE:
      return 'bg-info'
    case ENotificationType.REMINDER:
      return 'bg-danger'
    default:
      return 'bg-primary'
  }
}
