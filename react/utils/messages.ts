import type { MessageDescriptor } from 'react-intl'
import { defineMessages } from 'react-intl'

export const messages: {
  [name: string]: MessageDescriptor
} = defineMessages({
  title: {
    id: '"admin/buybox-context.title',
  },
  sortStrategyTitle: {
    id: '"admin/buybox-context.sortStrategy-title',
  },
  sortStrategyDescription: {
    id: '"admin/buybox-context.sortStrategy-description',
  },
  triggerCepChangeEventTitle: {
    id: '"admin/buybox-context.triggerCepChangeEvent-title',
  },
  triggerCepChangeEventDescription: {
    id: '"admin/buybox-context.triggerCepChangeEvent-description',
  },
  expressionTitle: {
    id: '"admin/buybox-context.expression-title',
  },
  expressionDescription: {
    id: '"admin/buybox-context.expression-description',
  },
  protocolError: {
    id: '"admin/buybox-context.protocol-error',
  },
})
