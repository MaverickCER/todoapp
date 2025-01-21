import { Fragment } from 'react';

function renderJson(node) {
  const { children, innerText, tag: Tag, ...attributes } = node;
  if (node.tag === 'fragment') {
    return innerText
      ? innerText
      : (children || []).map((child, index) => <Fragment key={index}>{renderJson(child)}</Fragment>);
  }
  if (['br', 'hr', 'img', 'wbr'].includes(Tag)) {
    return <Tag {...attributes} />;
  }
  return (
    <Tag {...attributes}>
      {innerText
        ? innerText
        : (children || []).map((child, index) => <Fragment key={index}>{renderJson(child)}</Fragment>)}
    </Tag>
  );
}

export function RenderJson({ json }) {
  // return <pre>{JSON.stringify(json, undefined, 2)}</pre>
  return <>{renderJson(json)}</>;
}

export default RenderJson;
