import { Field } from '@srcube-taro/form'
import { View } from '@tarojs/components'
import { capitalize } from 'lodash-es'
import { Page, Section } from '@/components'

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const
const variants = ['default', 'outline', 'twotone', 'underline'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

const placements = ['outside', 'outside-left', 'inside'] as const

export default function FormPage() {
  return (
    <Page>
      <View className="text-center my-4 text-lg font-semibold">Form - Field</View>
      {/* Basic */}
      <Section title="Basic" contentClass="space-y-2">
        <Field label="Label Content" value="Value content" description="Helper text" />
      </Section>
      {/* Colors */}
      <Section title="Colors" contentClass="space-y-2">
        {colors.map(c => <Field key={c} label="Label Content" labelPlacement="inside" color={c} value={capitalize(c)} />)}
      </Section>
      {/* Variants */}
      <Section title="Variants" contentClass="space-y-2">
        {variants.map(v => (
          <Field key={`${v}`} variant={v} value={capitalize(v)} />
        ))}
      </Section>
      {/* Sizes */}
      <Section title="Sizes" contentClass="space-y-2">
        {sizes.map(s => <Field key={s} size={s} value={s.toUpperCase()} />)}
      </Section>
      {/* Invalid */}
      <Section title="Invalid" contentClass="space-y-2">
        <Field label="Email" isInvalid errorMessage="Invalid email">
          {({ id, inputClass }) => <View id={id} className={inputClass}>srcube.chioio@gmail.com</View>}
        </Field>
      </Section>
      {/* Disabled */}
      <Section title="Disabled" contentClass="space-y-2">
        <Field label="Email" isDisabled>
          {({ id, inputClass }) => <View id={id} className={inputClass}>srcube.chioio@gmail.com</View>}
        </Field>
      </Section>
      {/* Label Placement */}
      <Section title="Label Placement" contentClass="space-y-2">
        {placements.map(p => (
          <Field key={p} label={capitalize(p)} color="primary" labelPlacement={p} value="Lorm text content" />
        ))}
      </Section>
      {/* Slots */}
      <Section title="Slots" contentClass="space-y-2">
        <Field
          label="With slots"
          description="Start/End content and clear"
          isClearable
          clearButton={<View className="i-[material-symbols--close] size-5" />}
          startContent={<View className="i-[mage--stars-c-fill] size-4" />}
          endContent={<View className="i-[mdi--information] size-4" />}
        >
          {({ id, inputClass }) => <View id={id} className={inputClass}>Slot view</View>}
        </Field>
      </Section>
    </Page>
  )
}
