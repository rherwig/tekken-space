import SimpleMoveDisplay from '@/components/notation/simple-move-display'

const SAMPLE_NOTATION = 'd/f+2;4;d/f+4;3,2,B,SWY,1+2;H!,2+3;b+2,1'

export default function Share() {
    return (
        <div className="container py-4">
            <SimpleMoveDisplay notation={SAMPLE_NOTATION} />
        </div>
    )
}
