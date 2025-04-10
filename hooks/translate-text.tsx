/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react'
import { WoosmapView } from '@woosmap/react-native-woosmap'

import translateText from './translate'

const withTranslation = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const translateChildren = async (children: ReactNode): Promise<ReactNode> => {
      if (typeof children === 'string') {
        return await translateText(children)
      }
      return children
    }

    const [translatedProps, setTranslatedProps] = useState(props)

    useEffect(() => {
      const translate = async () => {
        const newProps = { ...props }
        if (newProps.children) {
          newProps.children = await translateChildren(newProps.children)
        }
        setTranslatedProps(newProps)
      }
      translate()
    }, [props.children])

    return <Component {...translatedProps} />
  }
}

const TranslatedWoosmapView = withTranslation(WoosmapView)
export default TranslatedWoosmapView
