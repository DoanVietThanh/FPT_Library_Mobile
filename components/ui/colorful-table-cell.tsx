import { Text } from 'react-native'
import { cn } from '~/lib/utils'

import { TableCell } from './table'

type Props = {
  number: number
  classname?: string
  mark: '%' | '$' | ''
}

const ColorfulTableCell = ({ number, classname, mark = '' }: Props) => {
  return (
    <TableCell
      className={cn(
        'border text-center font-semibold',
        { 'text-success': number >= 80 },
        { 'text-danger': number < 80 },
        classname,
      )}
    >
      <Text>
        {number}
        {mark}
      </Text>
    </TableCell>
  )
}

export default ColorfulTableCell
