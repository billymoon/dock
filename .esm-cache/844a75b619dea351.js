let lorem;_19d‍.w('../lorem',[["default",function(v){lorem=v}]]);

_19d‍.d((req, res, opts) => {
  const { qty } = opts.params

  if (qty % 2) {
    throw Error('qty param must be even number')
  }

  return `{"lorem": "${lorem(qty)}"}`
});
