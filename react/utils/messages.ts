import type { MessageDescriptor } from 'react-intl'
import { defineMessages } from 'react-intl'

export const messages: {
  [name: string]: MessageDescriptor
} = defineMessages({
  title: {
    id: 'store/buybox-context.title',
  },
  sortStrategyTitle: {
    id: 'store/buybox-context.sortStrategy-title',
  },
  sortStrategyDescription: {
    id: 'store/buybox-context.sortStrategy-description',
  },
  triggerCepChangeEventTitle: {
    id: 'store/buybox-context.triggerCepChangeEvent-title',
  },
  triggerCepChangeEventDescription: {
    id: 'store/buybox-context.triggerCepChangeEvent-description',
  },
  expressionTitle: {
    id: 'store/buybox-context.expression-title',
  },
  expressionDescription: {
    id: 'store/buybox-context.expression-description',
  },
  protocolError: {
    id: 'store/buybox-context.protocol-error',
  },
})
