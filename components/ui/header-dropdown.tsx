import * as React from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/contexts/auth-provider'
import { useLibraryStorage } from '~/contexts/library-provider'
import { Href, useRouter } from 'expo-router'
import { User } from 'lucide-react-native'

import Loading from './loading'

export function HeaderDropdown() {
  const router = useRouter()
  const { isLoadingAuth, user } = useAuth()
  const { borrowedLibraryItems, borrowedResources } = useLibraryStorage()

  if (isLoadingAuth) return <Loading />

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant="outline">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="native:w-72 w-52">
        <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex flex-row justify-between gap-2"
            onPress={() => router.push('/(tabs)/home/borrows' as Href)}
          >
            <Text className="text-xs ">Borrow list</Text>
            <Text className="text-xs ">
              ({borrowedLibraryItems.items.length + borrowedResources.items.length} items)
            </Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <Text>Log out</Text>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
