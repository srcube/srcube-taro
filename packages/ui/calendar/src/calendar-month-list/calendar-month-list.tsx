import type { UseCalendarMonthListProps } from './use'
import { ScrollView, View } from '@tarojs/components'
import { useCalendarMonthList } from './use'

export interface CalendarMonthListProps extends UseCalendarMonthListProps {}

function CalendarMonthList(props: CalendarMonthListProps) {
  const { itemContent, data } = props
  const {
    measured,
    measureItemIndex,
    containerRef,
    idBase,
    scrollIntoViewId,
    visibleItems,
    topSpacer,
    bottomSpacer,
    handleScroll,
  } = useCalendarMonthList(props)

  // Render for measuring month heights
  if (!measured) {
    return (
      <View style={{
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        width: '100%',
      }}
      >
        <View id={`${idBase}-measure`}>
          {itemContent(data[measureItemIndex], measureItemIndex)}
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      ref={containerRef}
      scrollY
      enhanced
      fastDeceleration
      showScrollbar={false}
      style={{ height: '100%', width: '100%' }}
      scrollIntoView={scrollIntoViewId}
      onScroll={handleScroll}
    >
      <View style={{ height: topSpacer }} />
      {visibleItems.map(({ item, index }) => (
        <View key={`${idBase}-${index}`} id={`${idBase}-${index}`}>
          {itemContent(item, index)}
        </View>
      ))}
      <View style={{ height: bottomSpacer }} />
    </ScrollView>
  )
}

CalendarMonthList.displayName = 'Srcube.CalendarMonthList'

export default CalendarMonthList
