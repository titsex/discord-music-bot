import { COLOR_TYPES, COLORS } from '@types'
import { getDate } from '@utils'

export class Logger {
    public static info(...data: unknown[]) {
        console.log(
            `${COLORS.CYAN + COLOR_TYPES.BOLD}[INFO]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${getDate()})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }

    public static error(...data: unknown[]): void {
        console.log(
            `${COLORS.RED + COLOR_TYPES.BOLD}[ERROR]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${getDate()})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }
}
