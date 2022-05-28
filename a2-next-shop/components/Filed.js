function Filed({ lable, children }) {
  return (
    <>
      <lable className="block my-2">
        <span className="block text-sm text-gray-600">{lable}</span>
        {children}
      </lable>
    </>
  )
}
export default Filed