function DarkTheme() {
  return (
    <style jsx global>
      {`
        /* Dark Theme 設定變量 */
        :root {
          --background-color: rgb(19, 19, 19);
          --text-color: rgb(242, 240, 240);
          --link-color: rgb(239, 157, 6);
        }
      `}
    </style>
  )
}

export default DarkTheme
