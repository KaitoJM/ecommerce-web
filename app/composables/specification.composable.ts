export const useSpecification = () => {
  const formatSpecification = (combination: string) => {
    const combinationObject: Array<{ attribute_id: string; value: string }> =
      JSON.parse(combination);

    let label = "";
    combinationObject.forEach((item, key) => {
      if (key == 0) {
        label += `${item.value} `;
      } else {
        label += `| ${item.value}`;
      }
    });

    return label.trim();
  };

  return {
    formatSpecification,
  };
};
