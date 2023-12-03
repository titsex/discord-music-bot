import { Filter } from 'distube'

export function genSpeedFilter(speed: number): Filter {
    return {
        name: 'speed',
        value: `atempo=sqrt(${speed}),atempo=sqrt(${speed})`,
    }
}
