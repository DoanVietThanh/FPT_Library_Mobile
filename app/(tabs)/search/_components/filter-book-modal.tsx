import React from 'react'
import { Animated, Easing, Modal, Text, View } from 'react-native'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { CheckCircle, RefreshCcw, SearchCheck, X } from 'lucide-react-native'

type Props = {
  isVisible: boolean
  setIsVisible: (value: boolean) => void
  slideAnim: Animated.Value
}

const FilterBookModal = ({ isVisible, setIsVisible, slideAnim }: Props) => {
  const closeRightSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Slide out
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => {
      setIsVisible(false) // Hide modal after animation
    })
  }

  return (
    <Modal transparent visible={isVisible} onRequestClose={closeRightSheet}>
      <View className="flex-1 bg-black/50">
        <View className="absolute right-0 h-full w-[80%] rounded-l-2xl bg-gray-100 px-4 py-6">
          <View className="flex h-full flex-col justify-between gap-2">
            <View className="flex flex-row items-center gap-4">
              <Button variant={'destructive'} size={'icon'} onPress={closeRightSheet}>
                <X size={16} color="white" />
              </Button>
              <Text className="text-xl font-semibold">Tất cả bộ lọc</Text>
            </View>
            <Accordion
              type="multiple"
              //   value={activeAccordion}
              //   onValueChange={(value) => setActiveAccordion(value)}
              collapsible
              defaultValue={['item-0']}
              className="flex-1 bg-white"
            >
              <AccordionItem value="item-0">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Tìm kiếm nâng cao</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 ">
                  <View className="px-4 py-2">
                    <View className="flex w-full flex-row items-center rounded-lg border pl-2">
                      <SearchCheck size={16} color="black" />
                      <Input
                        placeholder={'Search'}
                        placeholderTextColor={'#A0AEC0'}
                        className="native:h-8 flex-1 border-none border-transparent pl-2 outline-none"
                      />
                    </View>
                  </View>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Nhà cung cấp nội dung</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Loại nguồn</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Chủ đề</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Nhà xuất bản</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Ấn phẩm</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="bg-gray-200 px-4 py-2">
                  <Text className="text-base font-medium">Năm xuất bản</Text>
                </AccordionTrigger>
                <AccordionContent className="bg-gray-100 px-4 py-2">
                  <Text>content...</Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <View className="flex flex-row justify-between gap-2">
              <Button variant={'secondary'} className="flex flex-1 flex-row items-center gap-2">
                <CheckCircle size={16} color="black" />
                <Text>Search</Text>
              </Button>
              <Button variant={'outline'} className="flex flex-1 flex-row items-center gap-2">
                <RefreshCcw size={16} color="black" />
                <Text>Reset</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FilterBookModal
