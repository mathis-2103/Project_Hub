import React from "react";
import {FormControl, FormLabel, Input, Textarea, useColorModeValue, Select} from "@chakra-ui/react";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface InputProps {
    label: string;
    name: string;
    type: string;
    value?: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    selectOptions?: { value: string; label: string }[];
    isRequired: boolean;
}

interface GenericOption {
    value: string;
    label: string;
    data: any;
}

function InputComponent(props: InputProps) {
    const borderColor = useColorModeValue('#1C2942', '#BFBFB8');
    const hoverBgColor = useColorModeValue('#A3A3A3', '#262F40');
    const labelColor = useColorModeValue('gray.600', '#A3A3A3');
    const placeholderColor = useColorModeValue('black', '#A3A3A3');
    return (
        <FormControl id={props.name} isRequired={props.isRequired} m={0} p={0} mb={3}>
            <FormLabel alignItems="flex-start"
                       fontSize={['md', 'lg', 'xl']}
                       color={labelColor}
                       transition="transform 0.3s, font-size 0.3s"
                       _hover={{
                           transform: 'scale(1.05)',
                           transformOrigin: 'left center',
                           _after: {
                               width: '15%'
                           }
                       }}
                       _after={{
                           content: '""',
                           position: 'absolute',
                           width: '0',
                           height: '1px',
                           bottom: '-1px',
                           left: '0',
                           backgroundColor: 'black',
                           transition: 'width 0.420s ease-in-out',
                       }}>
                {props.label}
            </FormLabel>


            {props.type === "textArea" && <Textarea value={props.value}
                                                    name={props.name}
                                                    rounded={"2xl"}
                                                    onChange={(e) => props.onChange(e)}
                                                    border={`3px solid ${borderColor}`}
                                                    _hover={{bg: hoverBgColor}}
                                                    _focus={{borderColor: borderColor, boxShadow: "none"}}
                                                    _placeholder={{color: placeholderColor}}/>}
            {props.type === "select" && <Select
                value={props.value ? props.value.toString() : ''}
                name={props.name}
                onChange={(e) => props.onChange(e)}
                rounded={"2xl"}
                border={`3px solid ${borderColor}`}
                _hover={{bg: hoverBgColor}}
                _focus={{borderColor: borderColor, boxShadow: "none"}}
            >
                {props.selectOptions && props.selectOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </Select>}
            {props.type !== "select" && props.type !== "textArea" &&
                <Input type={props.type}
                       name={props.name}
                       placeholder={props.label}
                       value={props.value}
                       onChange={(e) => props.onChange(e)}
                       rounded={"2xl"}
                       border={`3px solid ${borderColor}`}
                       _hover={{bg: hoverBgColor}}
                       _focus={{borderColor: borderColor, boxShadow: "none"}}
                       _placeholder={{color: placeholderColor}}
                />}
        </FormControl>
    )
}

export default InputComponent;