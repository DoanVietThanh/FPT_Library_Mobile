import React from 'react'
import { Image, Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CheckCircle, MapPin, XCircle } from 'lucide-react-native'

const PredictionResultTab = () => {
  const book = dummyBooks[0]

  if (!book) {
    return <Text className="text-center text-lg">Book not found</Text>
  }

  return (
    <View className="">
      <Card className="space-y-2 rounded-lg border-2 p-4">
        <View className="items-center">
          <Image source={{ uri: book.image }} className="h-64 w-64" resizeMode="contain" />
        </View>
        <Button className="mx-auto mt-2 w-64 flex-row items-center gap-2">
          <MapPin size={20} color={'white'} />
          <Text className="text-primary-foreground">Locate</Text>
        </Button>
      </Card>
      <Card className="mt-4 rounded-lg border-2 p-4">
        <Text className="text-sm">An edition of {book.title} (2024)</Text>
        <Text className="text-lg font-semibold text-primary">{book.title} (2024)</Text>
        <Text className="my-2 text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aut illum vero iusto
          similique quae error quis explicabo nemo iure.
        </Text>
        <Text className="italic">by {book.author}, 2000</Text>
        <Badge variant={'secondary'} className="mt-2 w-32">
          <Text>Second Edition</Text>
        </Badge>

        <View className="mt-4 flex-row justify-between">
          <Text>⭐ 5/5 Ratings</Text>
          <Text>25 Reading</Text>
          <Text>119 Have Read</Text>
        </View>

        <View className="mt-4">
          <Text className="font-semibold">Availability</Text>
          <View className="mt-2 flex-row gap-2">
            <CheckCircle size={16} color="green" />
            <Text>Hard Copy</Text>
          </View>
          <View className="my-2 flex-row gap-2">
            <CheckCircle size={16} color="green" />
            <Text>E-Book</Text>
          </View>
          <View className="flex-row gap-2">
            <XCircle size={16} color="gray" />
            <Text>Audio Book</Text>
          </View>
        </View>
      </Card>
      <Card className="mt-4 rounded-lg border-2 p-4">
        <Text className="text-center text-2xl font-semibold text-primary">AI-detected</Text>
        <View className="mt-4 flex flex-col gap-2">
          <View className="flex-row justify-between gap-4">
            <View className="flex flex-1 flex-row justify-between">
              <Text className="font-semibold">Title:</Text>
              <Text>90%</Text>
            </View>
            <Badge className="w-32 bg-green-500">
              <Text className="text-primary-foreground">Passed</Text>
            </Badge>
          </View>

          <View className="flex-row justify-between gap-4">
            <View className="flex flex-1 flex-row justify-between">
              <Text className="font-semibold">Author:</Text>
              <Text>10%</Text>
            </View>
            <Badge className="w-32 bg-danger">
              <Text className="text-primary-foreground">Not passed</Text>
            </Badge>
          </View>

          <View className="flex-row justify-between gap-4">
            <View className="flex flex-1 flex-row justify-between">
              <Text className="font-semibold">Publisher:</Text>
              <Text>90%</Text>
            </View>
            <Badge className="w-32 bg-green-500">
              <Text className="text-primary-foreground">Passed</Text>
            </Badge>
          </View>
        </View>

        <View className="mt-4 flex flex-col gap-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold">Threshold Value:</Text>
            <Text className="font-semibold">60%</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Match Overall:</Text>
            <Text className="font-semibold">90%</Text>
          </View>
          <View className="flex-row justify-between gap-4">
            <View className="flex flex-1 flex-row justify-between">
              <Text className="font-semibold">Status:</Text>
            </View>
            <Badge className="w-32 bg-green-500">
              <Text className="text-primary-foreground">Passed</Text>
            </Badge>
          </View>
        </View>
      </Card>
    </View>
  )
}

export default PredictionResultTab
