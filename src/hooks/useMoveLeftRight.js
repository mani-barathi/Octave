// left and Right Buttons present inside NewReleases, ArtistPage,RecentlyPlayed
function useMoveLeftRight(rowRef, setIsLeftBtn, setIsRightBtn) {

    const scrollLeft = () => {
        rowRef.current.scrollLeft -= 400
        const hasMoreLeft = rowRef.current.scrollLeft > 400
        setIsLeftBtn(hasMoreLeft)
        setIsRightBtn(true)
    }

    const scrollRight = () => {
        const offsetWidth = rowRef.current.offsetWidth
        rowRef.current.scrollLeft += 400
        const hasMoreRight = (rowRef.current.scrollWidth - (offsetWidth + rowRef.current.scrollLeft)) > 400
        setIsRightBtn(hasMoreRight)
        setIsLeftBtn(true)
    }

    return [scrollLeft, scrollRight]
}

export default useMoveLeftRight
