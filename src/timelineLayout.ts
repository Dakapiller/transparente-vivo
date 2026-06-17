export type TimelineMilestoneLayout = {
  dotLeft: number
  textLeft: number
  textWidth: number
}

export type TimelineSegmentLayout = {
  variant: 'blue' | 'dashed' | 'orange'
  left: number
  width: number
}

export const timelineWidth = 1202

export const timelineMilestones = [
  { dotLeft: 0, textLeft: 0, textWidth: 181 },
  { dotLeft: 248, textLeft: 248, textWidth: 181 },
  { dotLeft: 506, textLeft: 506, textWidth: 194 },
  { dotLeft: 765, textLeft: 765, textWidth: 181 },
  { dotLeft: 1011, textLeft: 1021, textWidth: 181 },
] as const satisfies readonly TimelineMilestoneLayout[]

export const timelineSegments = [
  { variant: 'blue', left: 16, width: 243 },
  { variant: 'dashed', left: 247, width: 264 },
  { variant: 'blue', left: 522, width: 243 },
  { variant: 'orange', left: 784, width: 229 },
] as const satisfies readonly TimelineSegmentLayout[]

export function toTimelinePercent(value: number) {
  return `${(value / timelineWidth) * 100}%`
}
