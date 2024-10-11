import Image from 'next/image'
import { InstructionSubType, ParsedInstruction } from '@tekken-space/parser'
import { TsChip } from '../../../chip/chip'

import tornadoSrc from './assets/tornado.png'
import heatSrc from './assets/heat.png'

export default function SpecialInstruction({
    instruction,
}: {
    instruction: ParsedInstruction
}) {
    return (
        <>
            {instruction.subType === InstructionSubType.HEAT && (
                <Image src={heatSrc} alt="During Heat" width={32} height={32} />
            )}

            {instruction.subType === InstructionSubType.RAGE && (
                <TsChip color="danger">{instruction.value}</TsChip>
            )}

            {instruction.subType === InstructionSubType.STANCE && (
                <TsChip>{instruction.value}</TsChip>
            )}

            {instruction.subType === InstructionSubType.TORNADO && (
                <Image src={tornadoSrc} alt="Tornado" width={32} height={32} />
            )}

            {instruction.subType === InstructionSubType.NONE && (
                <TsChip>{instruction.value}</TsChip>
            )}
        </>
    )
}
