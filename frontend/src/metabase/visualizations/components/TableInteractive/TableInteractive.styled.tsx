import styled from "@emotion/styled";
import Button from "metabase/core/components/Button";
import { color } from "metabase/lib/colors";

export const ExpandButton = styled(Button)`
  border: none;
  padding: 0 0.25rem;
  background-color: ${color("bg-light")};
  border-radius: 2px;
  color: ${color("text-medium")};
  margin-right: 0.5rem;

  &:hover {
    color: ${color("text-white")};
    background-color: ${color("brand")};
  }
`;
