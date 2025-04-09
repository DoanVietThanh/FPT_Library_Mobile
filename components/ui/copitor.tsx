import { useState } from 'react'
import { Pressable } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { Check, Copy } from 'lucide-react-native'

type CopitorProps = {
  content: string
}

const Copitor = ({ content }: CopitorProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Pressable
      onPress={copyToClipboard}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-background"
    >
      {copied ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
    </Pressable>
  )
}

export default Copitor
