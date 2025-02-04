import React from 'react'
import { Image, Text, View } from 'react-native'
import { dummyBooks } from '~/components/home/dummy-books'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CheckCircle, MapPin, Star, XCircle } from 'lucide-react-native'

const PredictionOtherMatchesTab = () => {
  const book = dummyBooks[0]

  if (!book) {
    return <Text className="text-center text-lg">Book not found</Text>
  }

  return (
    <View className="flex flex-col gap-2">
      {dummyBooks.map((book) => (
        <Card key={book.id} className="rounded-lg border-2 p-4">
          <View className="flex flex-row">
            <View className="flex w-2/5 flex-col items-center justify-between overflow-hidden">
              <Image
                source={{ uri: book.image }}
                className="h-44 w-44 overflow-hidden"
                resizeMode="contain"
              />
              <Button size={'sm'} className="mt-2 w-32 flex-row items-center gap-2">
                <MapPin size={16} color={'white'} />
                <Text className="text-xs text-primary-foreground">Locate</Text>
              </Button>
            </View>

            <View className="flex-1 p-2">
              <Text className="text-center text-sm font-semibold text-primary">AI-detected</Text>
              <View className="mt-4 flex flex-col gap-2">
                <View className="flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row justify-between">
                    <Text className="text-sm font-semibold">Title:</Text>
                    <Text className="text-sm">90%</Text>
                  </View>
                  <Badge className="w-24 bg-green-500">
                    <Text className="text-xs text-primary-foreground">Passed</Text>
                  </Badge>
                </View>

                <View className="flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row justify-between">
                    <Text className="text-sm font-semibold">Author:</Text>
                    <Text className="text-sm">10%</Text>
                  </View>
                  <Badge className="w-24 bg-danger">
                    <Text className="text-xs text-primary-foreground">Not passed</Text>
                  </Badge>
                </View>

                <View className="flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row justify-between">
                    <Text className="text-sm font-semibold">Publisher:</Text>
                    <Text className="text-sm">90%</Text>
                  </View>
                  <Badge className="w-24 bg-green-500">
                    <Text className="text-xs text-primary-foreground">Passed</Text>
                  </Badge>
                </View>
              </View>

              <View className="mt-4 flex flex-col gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm font-semibold">Threshold Value:</Text>
                  <Text className="text-sm font-semibold">60%</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm font-semibold">Match Overall:</Text>
                  <Text className="text-sm font-semibold">90%</Text>
                </View>
                <View className="flex-row justify-between gap-4">
                  <View className="flex flex-1 flex-row justify-between">
                    <Text className="text-sm font-semibold">Status:</Text>
                  </View>
                  <Badge className="w-24 bg-green-500">
                    <Text className="text-xs text-primary-foreground">Passed</Text>
                  </Badge>
                </View>
              </View>
            </View>
          </View>
          <Accordion
            type="multiple"
            collapsible
            defaultValue={['item-1']}
            className="native:max-w-md w-full max-w-sm overflow-hidden"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Text>More details</Text>
              </AccordionTrigger>
              <AccordionContent>
                <View className="max-w-md">
                  <Text className="text-sm">An edition of {book.title} (2024)</Text>
                  <Text className="text-lg font-semibold text-primary">{book.title} (2024)</Text>
                  {/* <Text className="my-2 max-w-md text-xs">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aut illum vero
                   iusto similique quae error quis explicabo nemo iure.
                 </Text> */}
                  <Text className="text-sm font-semibold italic">by {book.author}, 2000</Text>
                  <View className="flex flex-row items-center justify-between">
                    <Badge variant={'secondary'} className="mt-2 w-32">
                      <Text>Second Edition</Text>
                    </Badge>
                    <View className="flex flex-row gap-1">
                      <Star size={16} color="orange" fill={'yellow'} />
                      <Text>5/5</Text>
                    </View>
                  </View>

                  <View className="mt-4">
                    <Text className="font-semibold">Status</Text>
                    <View className="mt-2 flex w-full flex-row items-center justify-start gap-6">
                      <View className="w-1/3 flex-row gap-2">
                        <Badge className="w-24 bg-green-500">
                          <Text className="text-xs text-primary-foreground">Availability</Text>
                        </Badge>
                      </View>
                      <View className="flex-row">
                        <MapPin size={16} color="white" fill={'orange'} />
                        <Text className="text-sm">CS A-15</Text>
                      </View>
                    </View>
                  </View>

                  <View className="mt-4">
                    <Text className="font-semibold">Availability</Text>
                    <View className="mt-2 flex flex-row items-center justify-between">
                      <View className="flex-row gap-2">
                        <CheckCircle size={16} color="green" />
                        <Text className="text-sm">Hard Copy</Text>
                      </View>
                      <View className="flex-row gap-2">
                        <CheckCircle size={16} color="green" />
                        <Text className="text-sm">E-Book</Text>
                      </View>
                      <View className="flex-row gap-2">
                        <XCircle size={16} color="gray" />
                        <Text className="text-sm">Audio Book</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </View>
  )
}

export default PredictionOtherMatchesTab
