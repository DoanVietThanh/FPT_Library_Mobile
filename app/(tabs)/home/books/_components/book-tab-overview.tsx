import React from 'react'
import { Text, View } from 'react-native'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { SquarePen } from 'lucide-react-native'
import { Pressable } from 'react-native-gesture-handler'

const BookTabOverview = () => {
  return (
    <View className="mt-4 flex flex-col gap-4">
      <View className="flex flex-row items-center gap-2">
        <Text className="flex-1">Publish year: 2000</Text>
        <Text className="flex-1">Publisher: ABC</Text>
      </View>
      <View className="flex flex-row items-center gap-2">
        <Text className="flex-1">Language: English</Text>
        <Text className="flex-1">Pages: 200</Text>
      </View>
      <View>
        <Text className="font-semibold text-primary">Preview available in English</Text>
        <Text className="text-justify text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro sunt praesentium nisi
          eaque atque autem dolor, dolore, impedit voluptatibus rerum est esse voluptatum aperiam
          tempora cumque illo maxime iste in illum suscipit eos? Maiores cupiditate numquam adipisci
          beatae porro sint.
        </Text>
      </View>

      <Separator />
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Detail</Text>
        <View className="flex flex-row justify-between px-4">
          <Text>Published in</Text>
          <Text>United State</Text>
        </View>
      </View>

      {/* Edition notes */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Edition Notes</Text>
        <View className="flex flex-row justify-between px-4">
          <Text>Series</Text>
          <Text>Dover large print classics</Text>
        </View>
        <View className="flex flex-row justify-between px-4">
          <Text>Genre</Text>
          <Text>Fiction</Text>
        </View>
      </View>

      {/* Classifications */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Classifications</Text>
        <View className="flex flex-row justify-between px-4">
          <Text>Dewey Decimal Class</Text>
          <Text>823/.8</Text>
        </View>
        <View className="flex flex-row justify-between px-4">
          <Text>Library of Congress</Text>
          <Text>PR5485 .A1 2002</Text>
        </View>
      </View>

      {/* The physical object */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">The physical object</Text>
        <View className="flex flex-row justify-between px-4">
          <Text>Pagination</Text>
          <Text>ix, 112 p. (large print)</Text>
        </View>
        <View className="flex flex-row justify-between px-4">
          <Text>Number of pages</Text>
          <Text>216</Text>
        </View>
      </View>

      {/* ID numbers */}
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">ID Numbers</Text>
        <View className="flex flex-row justify-between px-4">
          <Text>My Book Shelf</Text>
          <Text>OL3570252M</Text>
        </View>
        <View className="flex flex-row justify-between px-4">
          <Text>ISBN 10</Text>
          <Text>0486424715</Text>
        </View>

        <View className="flex flex-row justify-between px-4">
          <Text>LCCN</Text>
          <Text>2002073560</Text>
        </View>
        <View className="flex flex-row justify-between px-4">
          <Text>Library Thing</Text>
          <Text>12349</Text>
        </View>

        <View className="flex flex-row justify-between px-4">
          <Text>Good reads</Text>
          <Text>690668</Text>
        </View>
      </View>

      <Separator />
      <View className="flex flex-col gap-2">
        <Text className="text-xl font-semibold text-primary">Community Reviews</Text>
        <View className="flex flex-row items-center justify-between px-4">
          <Text>Page</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Meandering 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between px-4">
          <Text>Enjoyable</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Interesting 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between px-4">
          <Text>Difficulty</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Advanced 100%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between px-4">
          <Text>Genre</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Horror 66%</Text>
            </Badge>
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Mystery 33%</Text>
            </Badge>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between px-4">
          <Text>Mood</Text>
          <View className="flex flex-row items-center gap-2">
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Ominous 25%</Text>
            </Badge>
            <Badge className="flex items-center">
              <Text className="text-primary-foreground">Scientific 25%</Text>
            </Badge>
          </View>
        </View>

        <Button variant={'secondary'} className="flex flex-row items-center gap-2">
          <SquarePen size={16} className="text-primary" />
          <Text className="font-semibold text-primary">Add your community review</Text>
        </Button>
      </View>
    </View>
  )
}

export default BookTabOverview
