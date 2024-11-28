import { SafeAreaView, ScrollView } from 'react-native'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
  children: React.ReactNode
}

export const Container = ({ children, className }: Props) => {
  return (
    <SafeAreaView className={cn(styles.container, className)}>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  )
}

const styles = {
  container: 'flex flex-1 m-6',
}
