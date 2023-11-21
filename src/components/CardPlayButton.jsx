import { usePlayerSotre } from "@/store/playerStore"
import { Pause, Play } from "./Player"

const CardPlayButton = ({ id }) => {

    const { isPlaying, currentMusic, setCurrentSong, setIsPlaying } = usePlayerSotre(state => state);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <button onClick={handleClick} className='card-play-button rounded-full bg-green-500 p-4 shadow-sm'>
            {isPlaying ? <Pause /> : <Play />}
        </button>
    )
}

export default CardPlayButton