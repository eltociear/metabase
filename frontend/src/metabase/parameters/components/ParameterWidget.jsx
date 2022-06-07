/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import ParameterValueWidget from "./ParameterValueWidget";
import S from "./ParameterWidget.css";
import FieldSet from "../../components/FieldSet";

export default class ParameterWidget extends Component {
  state = {
    isFocused: false,
  };

  static propTypes = {
    parameter: PropTypes.object,
    commitImmediately: PropTypes.bool,
  };

  static defaultProps = {
    parameter: null,
    commitImmediately: false,
  };

  renderPopover(value, setValue, placeholder, isFullscreen) {
    const { dashboard, parameter, commitImmediately, parameters } = this.props;

    return (
      <ParameterValueWidget
        parameter={parameter}
        parameters={parameters}
        dashboard={dashboard}
        name={name}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        focusChanged={this.focusChanged}
        isFullscreen={isFullscreen}
        commitImmediately={commitImmediately}
      />
    );
  }

  focusChanged = isFocused => {
    this.setState({ isFocused });
  };

  render() {
    const {
      className,
      parameter,
      isFullscreen,
      setValue,
      children,
    } = this.props;

    const renderFieldInNormalMode = () => {
      const fieldHasValueOrFocus =
        parameter.value != null || this.state.isFocused;
      const legend = fieldHasValueOrFocus ? parameter.name : "";

      return (
        <FieldSet
          legend={legend}
          noPadding={true}
          className={cx(className, S.container, {
            "border-brand": fieldHasValueOrFocus,
          })}
        >
          {this.renderPopover(
            parameter.value,
            value => setValue(value),
            parameter.name,
            isFullscreen,
          )}
          {children}
        </FieldSet>
      );
    };

    if (isFullscreen) {
      if (parameter.value != null) {
        return (
          <div style={{ fontSize: "0.833em" }}>{renderFieldInNormalMode()}</div>
        );
      } else {
        return <span className="hide" />;
      }
    } else {
      return renderFieldInNormalMode();
    }
  }
}
