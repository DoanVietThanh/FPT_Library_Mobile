import React from 'react'
import { Text, View } from 'react-native'
import usePackage from '~/hooks/packages/use-package'
import { formatPrice } from '~/lib/utils'

import Loading from './ui/loading'

type Props = {
  packageId: string
}

const PackageCard = ({ packageId }: Props) => {
  const { data: packageData, isLoading: isLoadingPackageData } = usePackage(Number(packageId))

  if (isLoadingPackageData) {
    return <Loading />
  }

  if (!packageData) {
    return <Text>Package not found</Text>
  }

  return (
    <View className={'mb-3 rounded-lg border-2 border-primary p-4'}>
      <View className="flex flex-row justify-between">
        <Text className="text-lg font-bold">{packageData.packageName}</Text>
        <Text className="text-lg font-bold">{formatPrice(packageData.price)}</Text>
      </View>
      <Text className="w-fit text-lg font-semibold">{packageData.durationInMonths} months</Text>
      <Text>{packageData.description}</Text>
    </View>
  )
}

export default PackageCard
