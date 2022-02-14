const sampleArray = ['a', '1', 'b', '2', 'c', '3']
for (let i = 0; i < sampleArray.length; i += 2) {
  const { [i]: key, [i + 1]: value } = sampleArray
  console.log({ [key]: value })
}
