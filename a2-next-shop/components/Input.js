// // 通過 props 接收所有父組件傳來的參數，
// function Input(props) {
//   return (
//     <>
//       {/* 通過擴展運算符將父組件傳進來的 props 擴展後放入 input  */}
//       <input {...props} className="border rounded px-3 py-1 w-80" />
//     </>
//   )
// }

function Input({ type, required, value, onChange }) {
  return (
    <>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="border rounded px-3 py-1 w-80" />
    </>
  )
}

export default Input